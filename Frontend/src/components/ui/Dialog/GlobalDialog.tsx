"use client"

import {
    DialogRoot,
    DialogBackdrop,
    DialogPositioner,
    DialogContent,
    DialogHeader,
    DialogBody,
    DialogFooter,
    DialogTitle,
    DialogActionTrigger,
    Box,
    Button,
    HStack,
    Text,
} from "@chakra-ui/react"
import { AlertCircle } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { hideDialog } from "@/store/slices/uiSlice"
import type { RootState } from "@/store"

export const GlobalDialog = () => {
    const dispatch = useDispatch()
    const { isOpen, title, message, onConfirm } = useSelector(
        (state: RootState) => state.ui.dialog
    )

    const handleConfirm = () => {
        dispatch(hideDialog())
        onConfirm?.()
    }

    const handleClose = () => {
        dispatch(hideDialog())
    }

    return (
        <DialogRoot
            open={isOpen}
            onOpenChange={(e) => !e.open && handleClose()}
            placement="center"
        >
            <DialogBackdrop bg="rgba(0,0,0,0.6)" />
            <DialogPositioner>
                <DialogContent
                    bg="#111111"
                    border="1px solid #262626"
                    borderRadius="12px"
                    maxW="420px"
                    w="90%"
                    p="0"
                    color="gray.100"
                >
                    {/* Header */}
                    <DialogHeader px="5" pt="5" pb="3">
                        <HStack gap="3">
                            <Box color="#f97316">
                                <AlertCircle size={20} />
                            </Box>
                            <DialogTitle fontSize="lg" fontWeight="600">
                                {title}
                            </DialogTitle>
                        </HStack>
                    </DialogHeader>

                    {/* Body */}
                    <DialogBody px="5" py="3">
                        <Text fontSize="sm" color="gray.400" lineHeight="1.6">
                            {message}
                        </Text>
                    </DialogBody>

                    {/* Footer */}
                    <DialogFooter
                        px="5"
                        py="4"
                        borderTop="1px solid #262626"
                        justifyContent="flex-end"
                        gap="3"
                    >
                        <DialogActionTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                color="gray.400"
                                _hover={{ color: "gray.200", bg: "whiteAlpha.100" }}
                                onClick={handleClose}
                            >
                                Later
                            </Button>
                        </DialogActionTrigger>

                        <Button
                            size="md"
                            px="6"
                            h="42px"
                            bg="#f97316"
                            color="black"
                            fontWeight="600"
                            borderRadius="8px"
                            _hover={{ bg: "#fb923c" }}
                            _active={{ bg: "#f97316" }}
                            onClick={handleConfirm}
                        >
                            Log in
                        </Button>

                    </DialogFooter>
                </DialogContent>
            </DialogPositioner>
        </DialogRoot>
    )
}
