import { useLocation } from 'react-router-dom';

export function GetQueryParam() {
  return new URLSearchParams(useLocation().search);
}
