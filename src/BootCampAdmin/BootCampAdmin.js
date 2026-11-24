import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import "./BootCampAdmin.css";

// localhost-la irundha local backend, production-la same domain (/api)
const API_BASE =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname === "localhost" ? "http://localhost:4002" : "");

const TOKEN_KEY = "bootcampAdminToken";

const CATEGORY_LABEL = {
  Student: "Student",
  Company: "Company",
  Business: "Business",
};

const readToken = () => {
  try {
    return sessionStorage.getItem(TOKEN_KEY) || "";
  } catch (e) {
    return "";
  }
};

const saveToken = (value) => {
  try {
    if (value) sessionStorage.setItem(TOKEN_KEY, value);
    else sessionStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    /* storage block aana ignore — page refresh pannina thirumba login aagum */
  }
};

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const BootCampAdmin = () => {
  const [token, setToken] = useState(readToken);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState("");
  const [filter, setFilter] = useState("all"); // all | paid | unpaid
  const [query, setQuery] = useState("");

  const logout = useCallback((message = "") => {
    saveToken("");
    setToken("");
    setRows([]);
    setLoginError(message);
  }, []);

  const loadRows = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setListError("");
    try {
      const res = await axios.get(`${API_BASE}/api/admin/bootcamp`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRows(res.data.data || []);
    } catch (error) {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        logout("Session expired. Please login again.");
      } else {
        setListError(error.response?.data?.message || "Could not load registrations.");
      }
    } finally {
      setLoading(false);
    }
  }, [token, logout]);

  useEffect(() => {
    loadRows();
  }, [loadRows]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    try {
      const res = await axios.post(`${API_BASE}/api/admin/login`, login);
      saveToken(res.data.token);
      setToken(res.data.token);
      setLogin({ username: "", password: "" });
    } catch (error) {
      setLoginError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  };

  const counts = useMemo(() => {
    const paid = rows.filter((r) => r.payment).length;
    return { total: rows.length, paid, unpaid: rows.length - paid };
  }, [rows]);

  const visibleRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter === "paid" && !r.payment) return false;
      if (filter === "unpaid" && r.payment) return false;
      if (!q) return true;
      return [r.fullName, r.email, r.phone, r.organization]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [rows, filter, query]);

  return (
    <main className="bootcamp_admin_pg_wrapper">
      <Helmet>
        <title>Bootcamp registrations | Upskld AI</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="bootcamp_admin_pg_container">
        <header className="bootcamp_admin_pg_header">
          <h1 className="bootcamp_admin_pg_title">Bootcamp registrations</h1>
          {token && (
            <div className="bootcamp_admin_pg_actions">
              <button
                type="button"
                className="bootcamp_admin_pg_btn_ghost"
                onClick={loadRows}
                disabled={loading}
              >
                {loading ? "Refreshing..." : "Refresh"}
              </button>
              <button
                type="button"
                className="bootcamp_admin_pg_btn_ghost"
                onClick={() => logout()}
              >
                Logout
              </button>
            </div>
          )}
        </header>

        {!token ? (
          <form className="bootcamp_admin_pg_login" onSubmit={handleLogin}>
            <h2 className="bootcamp_admin_pg_login_title">Admin login</h2>

            <label className="bootcamp_admin_pg_label" htmlFor="admin_username">
              Username
            </label>
            <input
              id="admin_username"
              className="bootcamp_admin_pg_input"
              type="text"
              autoComplete="username"
              required
              value={login.username}
              onChange={(e) => setLogin((p) => ({ ...p, username: e.target.value }))}
            />

            <label className="bootcamp_admin_pg_label" htmlFor="admin_password">
              Password
            </label>
            <div className="bootcamp_admin_pg_pw_wrap">
              <input
                id="admin_password"
                className="bootcamp_admin_pg_input bootcamp_admin_pg_pw_input"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={login.password}
                onChange={(e) => setLogin((p) => ({ ...p, password: e.target.value }))}
              />
              <button
                type="button"
                className="bootcamp_admin_pg_pw_toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {loginError && (
              <p className="bootcamp_admin_pg_error" role="alert">
                {loginError}
              </p>
            )}

            <button type="submit" className="bootcamp_admin_pg_btn" disabled={loggingIn}>
              {loggingIn ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          <>
            <div className="bootcamp_admin_pg_stats">
              <div className="bootcamp_admin_pg_stat">
                <span className="bootcamp_admin_pg_stat_num">{counts.total}</span>
                <span className="bootcamp_admin_pg_stat_label">Total</span>
              </div>
              <div className="bootcamp_admin_pg_stat bootcamp_admin_pg_stat_paid">
                <span className="bootcamp_admin_pg_stat_num">{counts.paid}</span>
                <span className="bootcamp_admin_pg_stat_label">Done</span>
              </div>
              <div className="bootcamp_admin_pg_stat bootcamp_admin_pg_stat_unpaid">
                <span className="bootcamp_admin_pg_stat_num">{counts.unpaid}</span>
                <span className="bootcamp_admin_pg_stat_label">Not paid</span>
              </div>
            </div>

            <div className="bootcamp_admin_pg_toolbar">
              <div className="bootcamp_admin_pg_tabs" role="tablist" aria-label="Payment filter">
                {[
                  { key: "all", label: "All" },
                  { key: "paid", label: "Done" },
                  { key: "unpaid", label: "Not paid" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={filter === tab.key}
                    className={
                      filter === tab.key
                        ? "bootcamp_admin_pg_tab bootcamp_admin_pg_tab_active"
                        : "bootcamp_admin_pg_tab"
                    }
                    onClick={() => setFilter(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <input
                className="bootcamp_admin_pg_input bootcamp_admin_pg_search"
                type="search"
                placeholder="Search name, email, phone, college..."
                aria-label="Search registrations"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {listError && (
              <p className="bootcamp_admin_pg_error" role="alert">
                {listError}
              </p>
            )}

            <div className="bootcamp_admin_pg_table_wrap">
              <table className="bootcamp_admin_pg_table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Full name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Type</th>
                    <th scope="col">College / company / business</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((row, index) => (
                    <tr key={row.id}>
                      <td>{index + 1}</td>
                      <td>{row.fullName}</td>
                      <td>{row.email}</td>
                      <td>{row.phone}</td>
                      <td>{CATEGORY_LABEL[row.category] || "-"}</td>
                      <td>{row.organization || "-"}</td>
                      <td>
                        {row.payment ? (
                          <span
                            className="bootcamp_admin_pg_badge bootcamp_admin_pg_badge_paid"
                            title={row.paymentId ? `Payment ID: ${row.paymentId}` : undefined}
                          >
                            Done
                          </span>
                        ) : (
                          <span className="bootcamp_admin_pg_badge bootcamp_admin_pg_badge_unpaid">
                            Not paid
                          </span>
                        )}
                      </td>
                      <td>{formatDate(row.createdAt)}</td>
                    </tr>
                  ))}
                  {!loading && visibleRows.length === 0 && (
                    <tr>
                      <td colSpan={8} className="bootcamp_admin_pg_empty">
                        No registrations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default BootCampAdmin;