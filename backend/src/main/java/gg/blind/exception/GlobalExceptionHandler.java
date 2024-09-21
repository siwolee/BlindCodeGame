package gg.blind.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(BusinessException.class)
	protected ResponseEntity handleException(BusinessException exception) {
		ErrorResponse response = new ErrorResponse(exception.getErrorCode());
		return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
	}

	@ExceptionHandler(DuplicationException.class)
	protected ResponseEntity handleException(DuplicationException exception) {
		ErrorResponse response = new ErrorResponse(exception.getErrorCode());
		return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
	}

	@ExceptionHandler(NotFoundException.class)
	protected ResponseEntity handleException(NotFoundException exception) {
		ErrorResponse response = new ErrorResponse(exception.getErrorCode());
		return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
	}
}
