import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface TermsAndConditionDialogProps {
  open?: boolean;
  onOpenChange?: () => void;
}

const TermsAndConditionDialog: React.FC<TermsAndConditionDialogProps> = ({
  open = false,
  onOpenChange,
}) => {
  return (
    <>
      <div>
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="overflow-auto max-h-[550px] scrollbar-hide">
            <DialogHeader>
              <DialogTitle className="text-blue-500">
                Terms and Conditions
              </DialogTitle>
              <h1>Your Agreement</h1>
              <DialogDescription>
                Last Updated: [Date] Welcome to BorrowPointe! These Terms and
                Conditions ("Terms") govern your use of the BorrowPointe
                application ("the Application") for obtaining loans through our
                peer-to-peer (P2P) lending platform. By accessing or using the
                Application to request or receive loans, you agree to be bound
                by these Terms. 1. Acceptance of Terms By registering for and/or
                using the Application, you agree to comply with and be bound by
                these Terms. If you do not agree to these Terms, please do not
                use the Application. 2. Overview of Services BorrowPointe
                provides a platform where borrowers can request loans and
                lenders can offer loans. The Application facilitates the
                connection and transaction process between borrowers and lenders
                but does not directly participate in the lending or borrowing
                process. 3. User Accounts To use the Application, you must
                create an account. You agree to provide accurate and complete
                information during the registration process and to update such
                information as necessary. You are responsible for maintaining
                the confidentiality of your account credentials and for all
                activities that occur under your account. 4. Eligibility To be
                eligible to use the Application as a borrower: You must be at
                least 18 years old. You must reside in a jurisdiction where P2P
                lending is legal. You must have a valid bank account. You must
                provide accurate personal, financial, and employment information
                as required. 5. Loan Requests Borrowers can create loan requests
                by specifying the loan amount, purpose, repayment terms, and
                other relevant details. All loan requests are subject to review
                and approval by BorrowPointe. You understand and agree that
                submitting a loan request does not guarantee that your loan will
                be funded. 6. Loan Agreements When a lender agrees to fund your
                loan request, a loan agreement ("Loan Agreement") will be
                created between you and the lender. The Loan Agreement will
                detail the terms and conditions of the loan, including the loan
                amount, interest rate, repayment schedule, and any fees. You
                agree to comply with the terms of the Loan Agreement. 7.
                Repayment You agree to repay the loan according to the terms
                specified in the Loan Agreement. Failure to make timely payments
                may result in additional fees, penalties, and reporting to
                credit bureaus. BorrowPointe may also take collection actions as
                described in the Loan Agreement. 8. Fees and Charges
                BorrowPointe may charge fees for its services, including
                origination fees, late payment fees, and other charges as
                outlined in the Application. All fees will be clearly disclosed
                before you agree to any loan. You are responsible for paying all
                fees associated with the loan as specified in the Loan
                Agreement. 9. Loan Disbursement Upon approval and acceptance of
                your loan request by a lender, the loan amount will be disbursed
                to your designated bank account. The disbursement process may
                take several business days, depending on the lender's policies
                and procedures. 10. Prohibited Activities You agree not to use
                the Application for any unlawful purpose or in any manner that
                could harm, disable, overburden, or impair the Application.
                Prohibited activities include, but are not limited to: Providing
                false or misleading information. Engaging in fraudulent or
                deceptive practices. Attempting to gain unauthorized access to
                the Application or its systems. Using the Application to harass,
                abuse, or harm other users. 11. Privacy Your privacy is
                important to us. Please review our Privacy Policy, which
                explains how we collect, use, and share your personal
                information. 12. Disclaimers The Application is provided "as is"
                and "as available" without any warranties of any kind, express
                or implied. BorrowPointe disclaims all warranties, including but
                not limited to, the warranties of merchantability, fitness for a
                particular purpose, and non-infringement. BorrowPointe does not
                warrant that the Application will be error-free, secure, or
                available at all times. 13. Limitation of Liability In no event
                shall BorrowPointe be liable for any direct, indirect,
                incidental, special, consequential, or punitive damages arising
                out of or related to your use of or inability to use the
                Application, even if BorrowPointe has been advised of the
                possibility of such damages. 14. Modifications to Terms
                BorrowPointe reserves the right to modify these Terms at any
                time. Any changes will be effective immediately upon posting the
                updated Terms within the Application. Your continued use of the
                Application following the posting of changes constitutes your
                acceptance of such changes. 15. Termination BorrowPointe may
                terminate or suspend your access to the Application at any time,
                with or without cause or notice, for any reason, including but
                not limited to, a breach of these Terms. 16. Governing Law These
                Terms shall be governed by and construed in accordance with the
                laws of [Jurisdiction], without regard to its conflict of law
                principles. 17. Contact Information If you have any questions or
                concerns about these Terms, please contact us at [Contact
                Information].
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default TermsAndConditionDialog;
