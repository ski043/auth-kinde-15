import React from "react";

const PrivateRoute = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <h1 className="text-5xl">This is an private route</h1>
      <p>Only authenticated User should see this secret route</p>
    </div>
  );
};

export default PrivateRoute;
