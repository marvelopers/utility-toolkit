import normalize from 'emotion-normalize';
import colors from 'constants/colors';
import { css, Global } from '@emotion/react';
import { GlobalPortal } from './GlobalPortal';

import 'sass/app.scss';
import { Routes } from './pages/Routes';
import { ReactNode } from 'react';

export default function App() {
  return (
    <GlobalPortal.Provider>
      <Global
        styles={css`
          ${normalize}
          h1, h2, h3, h4, h5, h6 {
            font-size: 1em;
            font-weight: normal;
            margin: 0; /* or ‘0 0 1em’ if you’re so inclined */
          }
        `}
      />
      <Layout>
        <Routes />
      </Layout>
    </GlobalPortal.Provider>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        max-width: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        height: auto;
      `}
    >
      <div
        css={css`
          background: ${colors.background};
        `}
      >
        {children}
      </div>
    </div>
  );
}
