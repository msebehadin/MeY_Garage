type Mode = 'manager' | 'mechanic';

interface Type {
  mode: Mode;
}

export function HeaderSection({ mode }:Type) {
  const config = {
    manager: {
      title: 'Admin Portal',
      description: 'Manage your shop, staff, and analytics.',
    },
    mechanic: {
      title: 'Workshop Check-in',
      description: 'Enter your unique 4-digit service PIN.',
    },
  };

  const { title, description } = config[mode];

  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-black text-slate-900 tracking-tight">{title}</h2>
      <p className="text-slate-500 font-medium">{description}</p>
    </div>
  );
}