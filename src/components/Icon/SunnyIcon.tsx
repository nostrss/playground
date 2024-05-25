import { MdSunny } from 'react-icons/md';

type Props = {
  size?: number;
  color?: string;
};

export default function SunnyIcon({ size = 20, color = 'black' }: Props) {
  return <MdSunny size={size} color={color} />;
}
