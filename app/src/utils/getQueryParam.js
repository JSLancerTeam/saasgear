/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation } from 'react-router-dom';

export default function getQueryParam() {
  return new URLSearchParams(useLocation().search);
}
