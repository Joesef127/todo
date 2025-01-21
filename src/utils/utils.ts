export const baseUrl: string = "https://todo-backend-drab-six.vercel.app/";

export const getPriorityColor = (priorityColor: string | undefined) => {
  switch (priorityColor) {
    case 'not important':
      return 'text-orange-400';
    case 'moderate':
      return 'text-blue-600';
    case 'very important':
      return 'text-green-800';
    default:
      return 'text-gray-500';
  }
};

export const getPriorityBg = (priorityBg: string | undefined) => {
  switch (priorityBg) {
    case 'not important':
      return 'bg-orange-400';
    case 'moderate':
      return 'bg-blue-600';
    case 'very important':
      return 'bg-green-800';
    default:
      return '';
  }
};