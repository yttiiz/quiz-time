export const FooterCopyrights = ({ copyrights }: { copyrights: string }) => {
  return (
    <>
      <span className="text-primary-content/40">
        {copyrights}{" "}
        {copyrights.includes("not found")
          ? ""
          : new Date().getUTCFullYear()}
      </span>
    </>
  );
};