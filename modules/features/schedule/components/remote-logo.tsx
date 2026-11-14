import { Image } from 'expo-image';
import { useState } from 'react';
import { View } from 'react-native';

type Props = {
  uri: string;
  size?: number;
};

type LogoFrameProps = {
  uri: string;
  size: number;
  onError: () => void;
};

const TEAM_LOGO_SIZE = 24;
const LOGO_INSET = 4;

export default function RemoteLogo({ uri, size = TEAM_LOGO_SIZE }: Props) {
  const [failed, setFailed] = useState(false);
  const handleError = () => setFailed(true);

  return !failed && <LogoFrame uri={uri} size={size} onError={handleError} />;
}

function LogoFrame({ uri, size, onError }: LogoFrameProps) {
  const artwork = { width: size, height: size };

  return (
    <View
      className="items-center justify-center overflow-hidden rounded-full bg-foreground"
      style={frameSize(size)}
    >
      <Image
        accessible={false}
        source={uri}
        style={artwork}
        contentFit="contain"
        onError={onError}
      />
    </View>
  );
}

function frameSize(artwork: number) {
  const edge = artwork + LOGO_INSET * 2;

  return { width: edge, height: edge };
}
