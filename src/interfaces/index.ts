export interface IEvents {
  id: number
  description: string
  preview_url: string
  start_time: string
}

export interface IVideo {
  by_categories: {}
  lives: IEvents[]
  upcomming: IEvents[]
}

export interface ITvChannel {
  videos: IVideo
}

export interface IUpcoming {
  type: string
  id: number
  description: string
  preview_url: string
  start_time: string
  title: string
  homeTeam?: string
  awayTeam?: string
  homeTeamLogo?: string
  awayTeamLogo?: string
  homeTeamShort?: string
  awayTeamShort?: string
  court?: string
  step?: string
  day?: string
}

export interface ITeams {
  id: number
  name: string
  shortName: string
  logo: string
  nameFromAPI: string
}

export interface IInputRegister {
  email: string
  password: string
  confirmPassword: string
  name: string
  birth_date: Date
  gender: 'male' | 'female'
  agreeTerms: boolean
}

export interface ILoginData {
  name: string
  email: string
  password: string
  channels: string[]
  gender: string
  birth_date: Date
}
