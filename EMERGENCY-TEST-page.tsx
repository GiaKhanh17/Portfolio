// EMERGENCY TEST - Replace src/app/page.tsx with this temporarily

export default function Home() {
  console.log("🚀 Emergency test page loading...");
  
  return (
    <div style={{
      background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
      color: "white", 
      padding: "50px",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h1 style={{fontSize: "3rem", marginBottom: "20px"}}>
        🔍 EMERGENCY DEBUG TEST
      </h1>
      <p style={{fontSize: "1.5rem", marginBottom: "20px"}}>
        If you see this, basic Next.js routing works!
      </p>
      <div style={{background: "rgba(0,0,0,0.3)", padding: "20px", borderRadius: "10px"}}>
        <p>✅ Next.js App Router working</p>
        <p>✅ CSS styles loading</p>
        <p>✅ React hydration successful</p>
      </div>
    </div>
  );
}