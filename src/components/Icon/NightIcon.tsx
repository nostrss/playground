import { MdDarkMode } from 'react-icons/md';

type Props = {
  size?: number;
  color?: string;
};

export default function NightIcon({ size = 20, color = 'black' }: Props) {
  return <MdDarkMode size={size} color={color} />;
}
