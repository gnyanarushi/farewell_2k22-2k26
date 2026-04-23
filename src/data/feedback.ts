import type { FeedbackItem } from '../types'

export const seedFeedback: FeedbackItem[] = [
  {
    name: 'A.Manoj kumar',
    role: 'Batch 2K22 — 2K26',
    emoji: '♥️',
    message: `My dear juniors,

A big, heartfelt thank you to all of you! From the welcome drink to the final moment, everything was just incredible. The energy, the effort, and the way you pulled the whole farewell together — truly amazing.

This is honestly one of the most memorable experiences we've had, and we'll carry it with us for a long time. Really grateful for all the thought and love you put into it.

Wishing you all the very best for what's ahead — go out there and do great things.`,
  },
  {
    name: 'A senior',
    role: 'Batch 2K22 — 2K26',
    emoji: '🫶🏻',
    message: `Thank you everyone for coordinating well....spcl thanks to hostlers you all worked very hard ....and also  editing ...food and Av are the spcl highlights in farewell...everything went soo smooth jst because of your coordination...❤️final ga andaru kastapadi event ni success cheysaru efforts pettina prati vallaki heartful thanks...🫶🏻❤️✨`,
  },
  {
    name: 'V.Thanuja',
    role: 'Batch 2K22 — 2K26',
    emoji: '💖',
    message: `Thank you so much for your lovely words and for organizing such a beautiful farewell for us 🫶🏻❤️

We truly appreciate all your efforts, care, and the happiness you gave us on that day. There's absolutely nothing to feel sorry about ..everything was wonderful and we really enjoyed every moment 😊

We will always cherish the memories we made together .. the fun, conversations, and bonding we shared. You all made our journey even more special ✨.We will miss you all too, and yes, let's definitely keep this beautiful senior-junior bond forever ❤️‍🩹

Stay happy and keep smiling always!😊💖`,
  },
  {
    name: 'T. Uday Pavan',
    role: 'Batch 2K22 — 2K26',
    emoji: '🤘',
    message: `Dear Juniors,

You guys seriously nailed it! From start to end, everything was perfect.
Thank you for making our farewell so special — this is a memory we will always cherish.

Wishing you all the very best for your journey ahead... keep rocking! 🤘`,
  },
]

export const fetchFeedback = async (): Promise<FeedbackItem[]> => seedFeedback
