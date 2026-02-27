import jorisLogo from "@/assets/joris-logo.png";

const Footer = () => (
  <footer className="bg-white py-8 px-4 border-t border-border">
    <div className="max-w-3xl mx-auto flex flex-col items-center gap-3">
      <img src={jorisLogo} alt="Joris Swinnen" className="h-10" />
      <p className="text-sm font-bold tracking-widest text-foreground">
        Joris@deltabase.be&nbsp;&nbsp;/&nbsp;&nbsp;+32 494 25 78 25
      </p>
    </div>
  </footer>
);

export default Footer;
