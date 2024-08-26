interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  bvnVerified: boolean;
  emailConfirmed: boolean;
  pinCreated: boolean;
  userType: string;
  createdAt: string;
  modifiedAt: string;
  userRoles: any[];
}