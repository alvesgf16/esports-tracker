import { Image } from 'expo-image';
import type { ReactNode } from 'react';
import { View } from 'react-native';

type Props = {
  uri: string;
  onError: () => void;
  size?: number;
};

type LogoFrameProps = {
  size: number;
  children: ReactNode;
};

type LogoImageProps = {
  uri: string;
  size: number;
  onError: () => void;
};

const TEAM_LOGO_SIZE = 24;
const LOGO_INSET = 4;

export default function RemoteLogo({
  uri,
  onError,
  size = TEAM_LOGO_SIZE,
}: Props) {
  return (
    <LogoFrame size={size}>
      <LogoImage uri={uri} size={size} onError={onError} />
    </LogoFrame>
  );
}

function LogoImage({ uri, size, onError }: LogoImageProps) {
  const artwork = { width: size, height: size };

  return (
    <Image
      accessible={false}
      source={uri}
      style={artwork}
      contentFit="contain"
      onError={onError}
    />
  );
}

function LogoFrame({ size, children }: LogoFrameProps) {
  return (
    <View
      className="items-center justify-center overflow-hidden rounded-full bg-foreground"
      style={frameSize(size)}
    >
      {children}
    </View>
  );
}

function frameSize(artwork: number) {
  const edge = artwork + LOGO_INSET * 2;

  return { width: edge, height: edge };
}
