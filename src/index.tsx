import axios, {AxiosError} from 'axios';
import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import 'react-native-get-random-values';
import {Navigation} from './providers';
import {App} from './providers/App';
import {ErrorBoundary} from './providers/ErrorBoundary';
import {Redux} from './providers/Redux';
import {debugDev} from './utils';

debugDev();
export const Main = (): JSX.Element => {
  return (
    <Redux>
      <ErrorBoundary>
        <App>
          <Navigation />
        </App>
      </ErrorBoundary>
    </Redux>
  );
};

AppRegistry.registerComponent('core', () => Main);
if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root');
  AppRegistry.runApplication('core', {rootTag});
}

type ParentValue = null; // show 'custom' in UI

type CommunicationPreferenceDetails = {
  inherited_from_id: number;
  inherited_from_type: string;
};

type ProviderCommunicationPreference = {
  id: number;
  allow_manage_pas: boolean; // "allow alto to manage prior auths"
  general_method: string | ParentValue; // "prescriber contact preferences"
  renewals_method: string | ParentValue; // "prescriber refill request preferences"
  prior_auth_method: string | ParentValue; // "default contact for prior auths"
  allow_manage_prior_auth: boolean; // "prior auth update preferences" | clinic default || custom
  should_send_prior_auth_submission_comm: boolean; // "a patients prior auth has been submitted"
  should_send_prior_auth_approval_comm: boolean; // "a patients prior auth has been approved"
  should_send_prior_auth_denial_comm: boolean; // "a patients prior auth has been denied"
  general_method_details: CommunicationPreferenceDetails;
  renewals_method_details: CommunicationPreferenceDetails;
  prior_auth_method_details: CommunicationPreferenceDetails;
  should_send_prior_auth_submission_comm_details: CommunicationPreferenceDetails;
  should_send_prior_auth_approval_comm_details: CommunicationPreferenceDetails;
  should_send_prior_auth_denial_comm_details: CommunicationPreferenceDetails;
};

type Clinic = {
  id: number;
  name: number; // "jumpstart burlingame"
  primary_phone_number: string | ParentValue; // "prescriber primary phone"
  primary_fax_number: string | ParentValue; // "prescriber primary fax"
  communication_preferences: ProviderCommunicationPreference;
};

type Prescriber = {
  id: number;
  name: string; // "carl evans"
  npi: string; // "59999934541"
  custom_preferences: boolean; // "yes/no"
  clinics: Clinic[];
};

// on load of settings screen
// http://providers.alto.com/dashboard/settings
await axios.request<Prescriber[], AxiosError>({
  method: 'get',
  url: '/clinic-prescribers',
});

// on modal save. save 1 clinic payload at a time
// http://providers.com/dashboard/settings/prescriber/1

type UpdatePrescriberClinic = {
  clinic: Clinic;
  prescriber: Prescriber;
};

const payload: UpdatePrescriberClinic = {};
await axios.request<UpdatePrescriberClinic, AxiosError>({
  method: 'put',
  url: '/clinic-prescribers',
  data: payload,
});
