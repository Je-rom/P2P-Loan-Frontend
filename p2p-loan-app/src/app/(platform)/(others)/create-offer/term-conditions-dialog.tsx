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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-auto max-h-[550px] scrollbar-hide">
        <DialogHeader>
          <DialogTitle className="text-blue-500">
            Terms and Conditions
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <h1>Your Agreement</h1>
          <p>
            <strong>Last Updated:</strong> 12-08-2024
          </p>
          <p>
            Welcome to BorrowPointe! These Terms and Conditions govern your use
            of the BorrowPointe application for obtaining loans through our
            peer-to-peer (P2P) lending platform. By accessing or using the
            Application to request or receive loans, you agree to be bound by
            these Terms.
          </p>
          <section>
            <h2 className="font-bold mt-4">1. Acceptance of Terms</h2>
            <p>
              By registering for and/or using the Application, you agree to
              comply with and be bound by these Terms. If you do not agree to
              these Terms, please do not use the Application.
            </p>
          </section>
          <section>
            <h2 className="font-bold mt-4">2. Overview of Services</h2>
            <p>
              BorrowPointe provides a platform where borrowers can request loans
              and lenders can offer loans. The Application facilitates the
              connection and transaction process between borrowers and lenders
              but does not directly participate in the lending or borrowing
              process.
            </p>
          </section>
          <section>
            <h2 className="font-bold mt-4">3. User Accounts</h2>
            <p>
              To use the Application, you must create an account. You agree to
              provide accurate and complete information during the registration
              process and to update such information as necessary. You are
              responsible for maintaining the confidentiality of your account
              credentials and for all activities that occur under your account.
            </p>
          </section>
          <section>
            <h2 className="font-bold mt-4">4. Eligibility</h2>
            <p>To be eligible to use the Application as a borrower:</p>
            <ul>
              <li>You must be at least 18 years old.</li>
              <li>
                You must reside in a jurisdiction where P2P lending is legal.
              </li>
              <li>You must have a valid bank account.</li>
              <li>
                You must provide accurate personal, financial, and employment
                information as required.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="font-bold mt-4">5. Loan Requests</h2>
            <p>
              Borrowers can create loan requests by specifying the loan amount,
              purpose, repayment terms, and other relevant details. All loan
              requests are subject to review and approval by BorrowPointe. You
              understand and agree that submitting a loan request does not
              guarantee that your loan will be funded.
            </p>
          </section>
          <section>
            <h2 className="font-bold mt-4">6. Loan Agreements</h2>
            <p>
              When a lender agrees to fund your loan request, a loan agreement
              ("Loan Agreement") will be created between you and the lender. The
              Loan Agreement will detail the terms and conditions of the loan,
              including the loan amount, interest rate, repayment schedule, and
              any fees. You agree to comply with the terms of the Loan
              Agreement.
            </p>
          </section>
          <section>
            <h2 className="font-bold mt-4">7. Repayment</h2>
            <p>
              You agree to repay the loan according to the terms specified in
              the Loan Agreement. Failure to make timely payments may result in
              additional fees, penalties, and reporting to credit bureaus.
              BorrowPointe may also take collection actions as described in the
              Loan Agreement.
            </p>
          </section>
          <section>
            <h2 className="font-bold mt-4">8. Fees and Charges</h2>
            <p>
              BorrowPointe may charge fees for its services, including
              origination fees, late payment fees, and other charges as outlined
              in the Application. All fees will be clearly disclosed before you
              agree to any loan. You are responsible for paying all fees
              associated with the loan as specified in the Loan Agreement.
            </p>
          </section>
          <section>
            <h2 className="font-bold mt-4">9. Loan Disbursement</h2>
            <p>
              Upon approval and acceptance of your loan request by a lender, the
              loan amount will be disbursed to your designated bank account. The
              disbursement process may take several business days, depending on
              the lender's policies and procedures.
            </p>
          </section>
          <section>
            <h2 className="font-bold mt-4">10. Prohibited Activities</h2>
            <p>
              You agree not to use the Application for any unlawful purpose or
              in any manner that could harm, disable, overburden, or impair the
              Application. Prohibited activities include, but are not limited
              to:
            </p>
            <ul>
              <li>Providing false or misleading information.</li>
              <li>Engaging in fraudulent or deceptive practices.</li>
              <li>
                Attempting to gain unauthorized access to the Application or its
                systems.
              </li>
              <li>
                Using the Application to harass, abuse, or harm other users.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="font-bold mt-4">11. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy,
              which explains how we collect, use, and share your personal
              information.
            </p>
          </section>
          <section>
            <h2 className="font-bold mt-4">12. Disclaimers</h2>
            <p>
              The Application is provided "as is" and "as available" without any
              warranties of any kind, express or implied. BorrowPointe disclaims
              all warranties, including but not limited to, the warranties of
              merchantability, fitness for a particular purpose, and
              non-infringement. BorrowPointe does not warrant that the
              Application will be error-free, secure, or available at all times.
            </p>
          </section>
          <section>
            <h2 className="font-bold mt-4">13. Limitation of Liability</h2>
            <p>
              In no event shall BorrowPointe be liable for any direct, indirect,
              incidental, special, consequential, or punitive damages arising
              out of or related to your use of or inability to use the
              Application, even if BorrowPointe has been advised of the
              possibility of such damages.
            </p>
          </section>
          <section>
            <h2 className="font-bold mt-4">14. Modifications to Terms</h2>
            <p>
              BorrowPointe reserves the right to modify these Terms at any time.
              Any changes will be effective immediately upon posting the updated
              Terms within the Application. Your continued use of the
              Application following the posting of changes constitutes your
              acceptance of such changes.
            </p>
          </section>
          <section>
            <h2 className="font-bold mt-4">15. Termination</h2>
            <p>
              BorrowPointe may terminate or suspend your access to the
              Application at any time, with or without cause or notice, for any
              reason, including but not limited to, a breach of these Terms.
            </p>
          </section>
          <section>
            <h2 className="font-bold mt-4">16. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of Jurisdiction, without regard to its conflict of law
              principles.
            </p>
          </section>
          <section>
            <h2 className="font-bold mt-4">17. Contact Information</h2>
            <p>
              If you have any questions or concerns about these Terms, please
              contact us at hello@borrowpointe.com.
            </p>
          </section>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default TermsAndConditionDialog;
