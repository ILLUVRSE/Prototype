interface AvatarSelectorProps {
  avatars: string[];
  value: string;
  onChange: (avatar: string) => void;
}

export function AvatarSelector({ avatars, value, onChange }: AvatarSelectorProps) {
  return (
    <div>
      {avatars.map((url) => (
        <img
          key={url}
          src={url}
          alt="avatar"
          style={{ border: url === value ? '2px solid blue' : undefined, cursor: 'pointer', width: 50 }}
          onClick={() => onChange(url)}
        />
      ))}
    </div>
  );
}
