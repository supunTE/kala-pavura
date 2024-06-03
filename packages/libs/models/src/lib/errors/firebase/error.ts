export interface FirebaseError {
  code: string;
  message: string;
}

export function isFirebaseError(error: any): error is FirebaseError {
  return (
    error && typeof error.code === 'string' && typeof error.message === 'string'
  );
}
