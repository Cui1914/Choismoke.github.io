type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <section className="settings-card">
      <h3>{title}</h3>
      {children}
    </section>
  );
}
