import { useLocation } from 'react-router-dom';

export default function GetQueryParam() {
  return new URLSearchParams(useLocation().search);
}
