import { COLLECTIONS } from '@constants'
import { app, storage, store } from '@remote/firebase'
import { userAtom } from '@atoms/user'

import styled from '@emotion/styled'
import useUser from '@hooks/auth/useUser'

import { getAuth, updateProfile } from 'firebase/auth'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { ChangeEvent } from 'react'
import { useSetRecoilState } from 'recoil'

function MyImage({
  size = 40,
  mode = 'default',
}: {
  size?: number
  mode?: 'default' | 'upload'
}) {
  const user = useUser()
  const setUser = useSetRecoilState(userAtom)

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    const currentUser = getAuth(app).currentUser

    if (files == null || user == null || currentUser == null) {
      return
    }

    // upload 로직 실행
    const fileName = files[0].name
    // console.log('file', file)
    // console.log('files', files)

    const storageRef = ref(storage, `users/${user.uid}/${fileName}`)

    // 실제 upload
    const uploaded = await uploadBytes(storageRef, files[0])
    // console.log('upload', upload)

    const downloadUrl = await getDownloadURL(uploaded.ref)
    // console.log('downloadUrl', downloadUrl)

    await updateProfile(currentUser, {
      photoURL: downloadUrl,
    })

    await updateDoc(doc(collection(store, COLLECTIONS.USER), currentUser.uid), {
      photoURL: downloadUrl,
    })

    setUser({
      ...user,
      photoURL: downloadUrl,
    })
  }

  return (
    <Container>
      <img
        src={
          user?.photoURL ||
          'https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/circle-user-64.png'
        }
        alt="user 이미지"
        width={size}
        height={size}
      />
      {mode === 'upload' ? (
        <input type="file" accept="image/*" onChange={handleUploadImage} />
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & img {
    border-radius: 100%;
  }

  & input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`

export default MyImage
