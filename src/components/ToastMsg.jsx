
  export function toastSuccess( title , description ) {
    return {
      title: title,
      description: description ,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position:'bottom-left'
    }
  }

  export function toastError( title , description ) {
    return {
      title: title,
      description: description ,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position:'bottom-left'
    }
  }