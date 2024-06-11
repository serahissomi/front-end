import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
} from '@chakra-ui/react'
import NavBar from './Navbar/NavBar'
// import PermissionSettings from './PermissionSettings'
import { ChevronRightIcon } from '@chakra-ui/icons'
import CodeEditor from './CodeEditor/CodeEditor'
import Terminal from './Terminal/Terminal'
import Tab from './Tab/Tab'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { startContainer } from '@/services/container'
import Loading from './Loading'
import tmpEntries from '@/data/file-system-entry.json'
import { FileSystemEntry } from '@/models/FileSystemEntryData'
import Explorer from './TabItem/Explorer'

const IDEPage = () => {
  const { id } = useParams()

  // TODO - 서버와 연동 후 주석 삭제
  /* eslint-disable @typescript-eslint/no-unused-vars */
  // @ts-ignore
  const [entries, setEntries] = useState<FileSystemEntry[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // NOTE - 상태 추적 변수: 로딩 중 컴포넌트가 언마운트되면 요청을 중단한다.
    let isCancelled = false

    // TODO - 서버와 연동 후 주석 삭제
    /* eslint-disable @typescript-eslint/no-unused-vars */
    // @ts-ignore
    const startContainerRequest = async () => {
      setIsLoading(true) // 로딩 시작

      try {
        const response = await startContainer(Number(id))

        if (!isCancelled && response.success) {
          setEntries(response.data || null)
        } else {
          console.log('Error fetching file system entries', response.error)
        }
      } finally {
        setIsLoading(false)
      }
    }

    // NOTE - 임시 엔트리
    setEntries(tmpEntries)

    setIsLoading(false)

    // TODO - 서버와 연동 후 주석 삭제
    // startContainerRequest()

    return () => {
      isCancelled = true
    }
  }, [id])

  if (isLoading) {
    // 로딩 중일 때 보여줄 UI
    return <Loading />
  }

  return (
    <>
      {/* SECTION 상단바 - 로고, 저장/실행 버튼 */}
      <NavBar />

      {/* SECTION 하단 영역 */}
      <Flex minH="calc(100vh - 48px)">
        {/* SECTION 파일 탐색기, 터미널, 권한 관리 탭 */}
        <Tab />

        {/* SECTION 파일 탐색기/권한 관리 영역 */}
        <Box minW="180px" p={2} borderRight="1px" borderColor="gray.200">
          <Explorer entries={entries} />
          {/* <PermissionSettings /> */}
        </Box>

        {/* SECTION 에디터/터미널 영역 */}
        <Flex direction="column" w="100%">
          {/* SECTION 에디터 영역 */}
          <Box p={2} fontSize="sm">
            <Breadcrumb
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}
            >
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">About</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">Contact</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
          <Flex grow={1}>
            <CodeEditor language="javascript" />
          </Flex>

          {/* SECTION 터미널 영역 */}
          <Box h={200} overflow="hidden">
            <Terminal />
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default IDEPage
