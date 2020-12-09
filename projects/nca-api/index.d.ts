export interface NcaContactFormPost {
  name: string
  sender: string
  typeIndex: string
  message: string
  host: string
  pathname: string
}

export interface NcaContactFormRes {
  statusCode: number
}
