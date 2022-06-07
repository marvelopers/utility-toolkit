import { CompletePage } from 'pages/CompletePage';
import { ConfirmationPage } from 'pages/ConfirmationPage';
import { LimitCheckPage } from 'pages/LimitCheckPage';
import { LoanSetupPage } from 'pages/LoanSetupPage';
import { StartPage } from 'pages/StartPage';
import { Route, Routes as ReactRouterRoutes, Navigate } from 'react-router-dom';

export const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/start" element={<StartPage />} />
      <Route path="/limit-check" element={<LimitCheckPage />} />
      <Route path="/loan-setup" element={<LoanSetupPage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
      <Route path="/complete" element={<CompletePage />} />
      <Route path="*" element={<Navigate replace to="/start" />} />
    </ReactRouterRoutes>
  );
};
