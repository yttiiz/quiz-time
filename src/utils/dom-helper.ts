import { MutableRefObject } from "react";

export class DomHelper {
  public static openDialog(dialogRef: MutableRefObject<HTMLDialogElement | null>) {
    if (dialogRef && dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  public static closeDialog(dialogRef: MutableRefObject<HTMLDialogElement | null>) {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };
}