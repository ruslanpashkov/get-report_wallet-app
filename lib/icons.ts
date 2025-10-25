import {
  faCreditCard,
  faShoppingCart,
  faMoneyBillTransfer,
  faCouch,
  faBullseye,
  faMusic,
  faGasPump,
  faGlobe,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { faApple } from "@fortawesome/free-brands-svg-icons";

const iconMap: Record<string, IconDefinition> = {
  "shopping-cart": faShoppingCart,
  apple: faApple,
  "money-bill-transfer": faMoneyBillTransfer,
  couch: faCouch,
  bullseye: faBullseye,
  music: faMusic,
  "gas-pump": faGasPump,
  globe: faGlobe,
};

export function getTransactionIcon(iconName: string): IconDefinition {
  return iconMap[iconName] || faCreditCard;
}
