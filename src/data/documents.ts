export interface DocumentItem {
  id: string;
  title: string;
  status: 'VERIFIED' | 'PENDING' | 'EXPIRED';
  statusLabel: string;
  subtitle: string;
  iconType: 'license' | 'registration' | 'insurance';
  variant: 'view' | 'edit' | 'upload';
}

export interface VerificationProgress {
  percentage: number;
  completedSteps: number;
  totalSteps: number;
  description: string;
}

export interface DocumentUploadData {
  progress: VerificationProgress;
  documents: DocumentItem[];
  processingInfo: {
    title: string;
    description: string;
  };
}

export const documentUploadData: DocumentUploadData = {
  progress: {
    percentage: 66,
    completedSteps: 2,
    totalSteps: 3,
    description: "Complete your remaining uploads to start receiving high-value logistics requests."
  },
  documents: [
    {
      id: "license",
      title: "Driver's License",
      status: "VERIFIED",
      statusLabel: "VERIFIED",
      subtitle: "Expires: Oct 24, 2026",
      iconType: "license",
      variant: "view"
    },
    {
      id: "registration",
      title: "Vehicle Registration",
      status: "PENDING",
      statusLabel: "PENDING REVIEW",
      subtitle: "Uploaded 2 hours ago",
      iconType: "registration",
      variant: "edit"
    },
    {
      id: "insurance",
      title: "Proof of Insurance",
      status: "EXPIRED",
      statusLabel: "EXPIRED",
      subtitle: "Action required: Upload new policy",
      iconType: "insurance",
      variant: "upload"
    }
  ],
  processingInfo: {
    title: "About processing times",
    description: "Verification usually takes 24–48 business hours. You'll receive a notification once your documents are processed by our enterprise compliance team."
  }
};
