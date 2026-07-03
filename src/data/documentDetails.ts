export interface DocumentDetails {
  name: string;
  category: string;
  status: 'Verified' | 'Pending' | 'Expired';
  verificationDate: string;
  previewImage: any;
  documentId: string;
  expiryDate: string;
  renewalTitle: string;
  renewalDescription: string;
}

export const documentDetailsData: DocumentDetails = {
  name: "Commercial Insurance\nCertificate",
  category: "COMPLIANCE DOCUMENT",
  status: "Verified",
  verificationDate: "Verified on Oct 24, 2023",
  previewImage: require('../assets/images/insurance_cert.png'),
  documentId: "POL-88293-TX",
  expiryDate: "Dec 12, 2024",
  renewalTitle: "Auto-Renewal Active",
  renewalDescription: "Your document is set to be automatically updated via our partnership with InsureLogistics™."
};
