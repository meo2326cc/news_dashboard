import Sidebar from "./Sidebar";
import { Drawer , DrawerOverlay , DrawerContent , Box} from "@chakra-ui/react";

function SidebarMobile({ isOpen, onClose }){


  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay/>
        <DrawerContent position='relative'>
            <Box display='flex' position='absolute' top='0' bottom='0' left='0' right='0'>
                <Sidebar displayOnMobile={'block'} />
            </Box>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SidebarMobile