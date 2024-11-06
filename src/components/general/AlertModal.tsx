import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
	triggerComponent?: React.ReactNode;
	title: string;
	desc?: string;
	confirmText?: string;
	confirmFunction?: () => void;
}

export default function AlertModal({
	triggerComponent,
	title,
	desc,
	confirmText,
	confirmFunction,
}: AlertModalProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				{triggerComponent || <Button variant="outline">Show Dialog</Button>}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{desc}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={confirmFunction}>
						{confirmText || "Continue"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
