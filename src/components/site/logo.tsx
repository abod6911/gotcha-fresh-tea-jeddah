import logoAsset from "@/assets/gotcha-logo.jpg.asset.json";

export function GotchaLogo({ className }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Gotcha Fresh Tea"
      loading="eager"
      className={`rounded-full bg-card object-contain p-0.5 ring-1 ring-border ${className ?? ""}`}
    />
  );
}
