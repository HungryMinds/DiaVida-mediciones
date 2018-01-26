/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         INTERFACE DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

export interface APIRequestOptions {
  authorization?: string;
  formData?: boolean;
  blobResponse?: boolean;
  customHeaders?: { [key: string]: string };
  params?: { [key: string]: any };
}
