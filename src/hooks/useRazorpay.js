import { useCallback, useEffect, useRef, useState } from "react";

const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY_ID || "<YOUR_KEY_ID>";
const API_BASE =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:4002"
    : "https://api.upskldai.com");

const loadScript = () =>
  new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) return resolve(true);
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const useRazorpay = () => {
  const [loading, setLoading] = useState(false);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    loadScript().then((ok) => { scriptLoaded.current = ok; });
  }, []);

  const pay = useCallback(async (options = {}) => {
    const {
      amount,
      description = "",
      prefill = {},
      notes = {},
      onSuccess,
      onFailure,
    } = options;

    if (!amount) return;
    setLoading(true);

    try {
      if (!scriptLoaded.current) {
        const ok = await loadScript();
        if (!ok) throw new Error("Razorpay script failed to load");
        scriptLoaded.current = true;
      }

      // Step 1: create order on backend
      const res = await fetch(`${API_BASE}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency: "INR", notes }),
      });
      if (!res.ok) throw new Error("Failed to create order");
      const data = await res.json();
      // console.log("[Razorpay] order from backend:", data);
      const order = data.order || data;
      const orderId = order.id || order.order_id || order.orderId;

      // Step 2: open Razorpay checkout
      const rzp = new window.Razorpay({
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "Upskld AI",
        description,
        image: "https://upskldai.com/og-image.jpg",
        order_id: orderId,
        prefill,
        notes,
        theme: { color: "#3b003d" },
        handler: async (response) => {
          try {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
            const verify = await fetch(`${API_BASE}/api/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ razorpay_payment_id, razorpay_order_id, razorpay_signature }),
            });
            const result = await verify.json();
            if (result.success) {
              onSuccess?.(response);
            } else {
              throw new Error(result.message || "Payment verification failed");
            }
          } catch (err) {
            onFailure?.(err);
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            onFailure?.({ message: "Payment cancelled" });
          },
        },
      });

      rzp.on("payment.failed", (res) => {
        onFailure?.(res.error);
        setLoading(false);
      });

      rzp.open();
    } catch (err) {
      onFailure?.(err);
      setLoading(false);
    }
  }, []);

  return { pay, loading };
};

export default useRazorpay;
