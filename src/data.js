export const data = {
  columns: ['list-2', 'list-1'],
  lists: {
    'list-1': {
      id: 'list-1',
      title: 'List 1',
      cards: ['card-1-2']
    },
    'list-2': {
      id: 'list-2',
      title: 'List 2',
      cards: ['card-2-1', 'card-1-1']
    }
  },
  cards: {
    'card-1-1': {
      id: 'card-1-1',
      title: 'Card 1-1',
      description: 'This is card 1-1',
      status: 'NEW',
      member: [
        {
          id: 'member-1',
          name: 'Tony Nguyen',
        }
      ]
    },
    'card-1-2': {
      id: 'card-1-2',
      title: 'Card 1-2',
      description: 'This is card 1-2',
      status: 'NEW',
      member: [
        {
          id: 'member-1',
          name: 'Hieu Nguyen',
        }
      ]
    },
    'card-2-1': {
      id: 'card-2-1',
      title: 'Card 2-1',
      description: 'This is card 2-1',
      status: 'NEW',
      member: [
        {
          id: 'member-1',
          name: 'Hieu Nguyen',
        }
      ]
    },
  }

}
