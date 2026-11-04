import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledLink = withUniwind(Link);

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center bg-background p-5">
        <Text className="text-xl font-bold text-foreground">
          This screen does not exist.
        </Text>
        <StyledLink href="/" className="mt-[15px] py-[15px]">
          <Text className="text-sm text-tint">Back to schedule</Text>
        </StyledLink>
      </View>
    </>
  );
}
