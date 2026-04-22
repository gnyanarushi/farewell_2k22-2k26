export type Photo = {
  id: string
  src: string
  thumb: string
  name?: string
  caption?: string
}

export type FeedbackItem = {
  name: string
  message: string
  emoji?: string
  role?: string
}
