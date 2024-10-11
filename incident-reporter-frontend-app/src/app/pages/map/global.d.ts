interface Window {
    approveIncident: (incidentId: number) => void;
    rejectIncident: (incidentId: number, marker: any) => void;
  }