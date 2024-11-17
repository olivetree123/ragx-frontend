import api from './index'

export function GetReportMethods() {
  return api.get('/api/report/methods')
}

export function GetReportList(data: {
  page: number
  methods: string[]
}) {
  return api.post('/api/report/list', data)
}

export function MarkReport(data: {
  query: string
  methods: string[]
  paragraph_id: number
  project_id: string
  score: number
}) {
  return api.post('/api/report/mark', data)
}
