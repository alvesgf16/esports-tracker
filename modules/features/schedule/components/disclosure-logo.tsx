import RemoteLogo from './remote-logo';

type Props = {
  imageUrl?: string;
  onLogoError?: () => void;
};

export default function DisclosureLogo({ imageUrl, onLogoError }: Props) {
  return (
    imageUrl &&
    onLogoError && (
      <RemoteLogo
        key={imageUrl}
        uri={imageUrl}
        size={32}
        onError={onLogoError}
      />
    )
  );
}
