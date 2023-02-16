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

export interface CommonResponse<T = unknown> {
  data: T
  messages: any[]
  fieldsErrors: any[]
  resultCode: number
}

export type SeverityType = 'error' | 'success' | 'info' | 'warning'
