import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect } from "react";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import SnakeGame from "./SnakeGame";

function App() {
  useEffect(() => {
    // important, never remove this sdk init
    sdk.actions.ready();
  }, []);

  return (
    <div
      style={{
        padding: "16px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <div className="xp-window" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="xp-titlebar">
          <span>Vibes Engineering - Retro Gaming</span>
        </div>
        <div className="xp-panel" style={{ textAlign: "center" }}>
          <h2 style={{ margin: "8px 0", fontSize: "14px", fontWeight: "bold" }}>
            Welcome to the Retro Arcade
          </h2>
          <p style={{ margin: "8px 0", fontSize: "11px" }}>
            Experience classic gaming with Windows XP style
          </p>
          <ConnectMenu />
        </div>
      </div>
      
      <SnakeGame />
    </div>
  );
}

function ConnectMenu() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  if (isConnected) {
    return (
      <div style={{ margin: "8px 0" }}>
        <div style={{ fontSize: "11px", marginBottom: "4px" }}>Connected account:</div>
        <div style={{ fontSize: "10px", fontFamily: "monospace", marginBottom: "8px", wordBreak: "break-all" }}>
          {address}
        </div>
        <SignButton />
      </div>
    );
  }

  return (
    <button 
      type="button" 
      className="xp-button"
      onClick={() => connect({ connector: connectors[0] })}
      style={{ margin: "8px 0" }}
    >
      Connect Wallet
    </button>
  );
}

function SignButton() {
  const { signMessage, isPending, data, error } = useSignMessage();

  return (
    <div style={{ margin: "8px 0" }}>
      <button
        type="button"
        className="xp-button"
        onClick={() => signMessage({ message: "hello world" })}
        disabled={isPending}
        style={{ marginBottom: "8px" }}
      >
        {isPending ? "Signing..." : "Sign Message"}
      </button>
      {data && (
        <div className="xp-panel" style={{ margin: "8px 0", fontSize: "10px" }}>
          <div style={{ marginBottom: "4px", fontWeight: "bold" }}>Signature:</div>
          <div style={{ fontFamily: "monospace", wordBreak: "break-all" }}>
            {data}
          </div>
        </div>
      )}
      {error && (
        <div className="xp-panel" style={{ margin: "8px 0", fontSize: "10px", background: "#ffcccc" }}>
          <div style={{ marginBottom: "4px", fontWeight: "bold", color: "#cc0000" }}>Error:</div>
          <div style={{ color: "#cc0000" }}>{error.message}</div>
        </div>
      )}
    </div>
  );
}

export default App;
