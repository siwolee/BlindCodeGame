package gg.blind.exception;

public class NotFoundException extends CustomRuntimeException {
	private ErrorCode errorCode;

	public NotFoundException(ErrorCode errorCode) {
		super(errorCode);
	}
}
