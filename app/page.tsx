"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [user, setUser] = useState("admin-user");

  const addLog = (log: string) => {
    setLogs((prevLogs) => [...prevLogs, `${new Date().toLocaleTimeString()}: ${log}`]);
  };
  function generateID() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length: 10 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  }
  const [id, setId] = useState("");
  useEffect(() => {
    setId(generateID());
  },[])
  const handleAuthentication = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false);
      addLog("Device disconnected.");
    } else {
      setIsAuthenticated(true);
      addLog("Device connected and authenticated.");
    }
  };

  const handleExecute = () => {
    if (!isAuthenticated) {
      addLog("Action failed: Device not authenticated.");
      return;
    }
    const action = (document.getElementById("action") as HTMLSelectElement).value;
    addLog(`User ${user} is attempting to execute action: ${action}`);
    if (user !== "admin-user" && action === "Update Firmware") {
      addLog("Action failed: User does not have permission to update firmware.");
      return;
    }
    addLog(`Secure communication channel established.`);
    addLog(`Executing action: ${action}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <header className="w-full max-w-5xl px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-zinc-900 dark:text-zinc-50">
          Zero Trust IoT Environment
        </h1>
      </header>
      <main className="flex flex-col md:flex-row w-full max-w-5xl gap-8 px-4" style={{color: 'black'}}>
        <div className="flex-1">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">IoT Device</h2>
            </div>
            <div className="card-content">
              <p>Device ID: <span className="font-mono">{id}</span></p>
              <p>Status: <span className={isAuthenticated ? "text-green-500" : "text-red-500"}>{isAuthenticated ? "Connected" : "Disconnected"}</span></p>
              <div className="card-footer">
                <button className="button" onClick={handleAuthentication}>
                  {isAuthenticated ? "Disconnect" : "Connect & Authenticate"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Control Panel</h2>
            </div>
            <div className="card-content">
              <div className="mt-4">
                <label htmlFor="user" className="label">User</label>
                <select id="user" className="input" value={user} onChange={(e) => setUser(e.target.value)}>
                  <option value="admin-user">admin-user</option>
                  <option value="guest-user">guest-user</option>
                </select>
              </div>
              <div className="mt-4">
                <label htmlFor="action" className="label">Action</label>
                <select id="action" className="input">
                  <option>Read Sensor Data</option>
                  <option>Update Firmware</option>
                </select>
              </div>
              <div className="card-footer">
                <button className="button" onClick={handleExecute}>Execute</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="w-full max-w-5xl px-4 mt-8">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Event Logs</h2>
          </div>
          <div className="card-content">
            <div className="h-48 overflow-y-auto bg-zinc-100 dark:bg-zinc-800 p-4 rounded-md">
              {logs.map((log, index) => (
                <p key={index} className="font-mono text-sm">{log}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
