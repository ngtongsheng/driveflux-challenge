import React, { FunctionComponent } from 'react';

export const Logo: FunctionComponent = () => {
  return (
    <svg className="logo svg-icon " width="91" height="29" viewBox="0 0 91 29">
      <title>Flux Home</title>
      <defs>
        <path id="prefix__XAXA" d="M.066.229H14.98v16.39H.066z"></path>
        <path id="prefix__SMIOD" d="M.38.4h6.028v5.99H.38z"></path>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fill="#000"
          d="M23 7h12v1.919H24.885v5.626h8.23v1.91h-8.23V24H23zM40 7h1.838v15.082H51V24H40zM56.77 16.4V7.126h1.86v9.155c0 3.536 1.885 5.526 5.043 5.526 3.039 0 4.97-1.826 4.97-5.409V7.127h1.862v9.132c0 4.776-2.757 7.258-6.88 7.258-4.075 0-6.855-2.482-6.855-7.118"
        ></path>
        <g transform="translate(75.668 6.898)">
          <mask id="prefix__IOFR" fill="#fff">
            <use xlinkHref="#prefix__XAXA"></use>
          </mask>
          <path
            fill="#000"
            mask="url(#prefix__IOFR)"
            d="M6.404 8.26L.302.229h2.191L7.56 6.925 12.576.23h2.168L8.642 8.237l6.338 8.382h-2.215L7.488 9.571 2.21 16.62H.066z"
          ></path>
        </g>
        <path
          d="M.883 16.44a2.985 2.985 0 010-4.238L12.141 1.014a3.029 3.029 0 014.265 0 2.983 2.983 0 010 4.238L5.148 16.441a3.015 3.015 0 01-2.132.878 3.015 3.015 0 01-2.133-.878zM6.513 22.036a2.985 2.985 0 010-4.24l5.628-5.592a3.029 3.029 0 014.265 0 2.984 2.984 0 010 4.239l-5.628 5.593a3.015 3.015 0 01-2.132.878 3.015 3.015 0 01-2.133-.878z"
          fill="#50C8E8"
          opacity="0.3"
        ></path>
        <g transform="translate(10.88 22.119)">
          <mask id="prefix__JDNIJ" fill="#fff">
            <use xlinkHref="#prefix__SMIOD"></use>
          </mask>
          <path
            d="M6.408 3.395A3.004 3.004 0 013.394 6.39 3.005 3.005 0 01.38 3.395 3.005 3.005 0 013.394.399a3.005 3.005 0 013.014 2.996"
            fill="#50C8E8"
            mask="url(#prefix__JDNIJ)"
          ></path>
        </g>
        <path
          d="M17.288 3.132a3.004 3.004 0 01-3.014 2.995 3.005 3.005 0 01-3.014-2.995A3.005 3.005 0 0114.274.136a3.004 3.004 0 013.014 2.996M17.288 14.322a3.004 3.004 0 01-3.014 2.995 3.005 3.005 0 01-3.014-2.995 3.005 3.005 0 013.014-2.995 3.004 3.004 0 013.014 2.995"
          fill="#50C8E8"
        ></path>
      </g>
    </svg>
  );
};

export default Logo;
