const isServerSide = () => !!process.env.IS_SERVER_FLAG;

export { isServerSide };
