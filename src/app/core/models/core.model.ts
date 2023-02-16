export interface MeResponse {
  data: {
    id: number
    login: string
    email: string
  }
  messages: string[]
  fieldErrors: string[]
  resultCode: number
}

export type SeverityType = 'error' | 'success' | 'info' | 'warning'
