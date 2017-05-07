<?php

	/**
	 * File CombineFiles.class.php
	 */
	
	/**
	 * Class ComBineFiles
	 * 
	 * Combines files to a single file to minimize HTTP Requests.
	 * It only combines local files.
	 *
	 */
 
	class CombineFiles extends PublicFunctions
	{
		public $files = array( 'allFiles' => array(), 'numFiles' => array( 'total' => 0 ) );
		public $defaultFileAttributes = array( 
											  'src' => ''
											, 'type' => 'javascript'
											, 'media' => 'all'
											, 'local' => true
										);
		public $defaultFileNamePrefix = 'combined_';
		// $addFile = array( 'src' => '', 'type' => '', 'media' => '' );
		
		public function __construct()
		{
			
		}
		
		public function getFiles( $type = '' )
		{
			if( empty( $type ) )
			{
				return false;
			}
			
			$dirpath = realpath( PATHS_WEBROOT . '/' . $type );	
			$files = array();
			
			if( false !== $dirpath )
			{
				if ($handle = opendir( $dirpath ) )
				{
					while ( false !== ( $entry = readdir( $handle ) ) )
					{
						if ( !in_array( $entry, array('.', '..', $this->defaultFileNamePrefix . $type . '.' . $this->getFileExtension( $type ), 'jquery.min.js' ) ) )
						{
							$files[][ 'src' ] = '/' . $type . '/' . $entry;
						}
					}
					closedir( $handle );
				}
			}
			return $files;
		}
		
		/**
		* Add one or many files to be combined.
		* 
		* @param string|array $file File or files to be combined. The class only combines local files of the same type (js/css).
		* If the provided argument is of array, the following keys should be presented: 
		* + src - the source (file path)
		* + type - javascript|css. Can be omitted and will be guessed by file extension.
		* + media - for css. Can be omitted and will be guessed by file type.
		* + local - bool. If the file is located locally or remotely.
		* 
		* @return bool True or false if the file(s) was/were added.
		*/
		
		public function addFile( $file = array() )
		{
			if( 0 === count( $file ) )
			{
				return false;
			}
			$files = array();
			
			if( 1 === func_num_args() )
			{
				$file = func_get_args();
				$files[] = $file[0];
			}
			else
			{
				$files = func_get_args();
			}

			$validatedFile = array();
			$numAddedFiles = 0;
			
			foreach( $files as $file )
			{
				$validatedFile = $this->validateNewFile( $file );
				if( false !== $validatedFile )
				{
					$this->files[ 'allFiles' ][] = $validatedFile;
					$this->files[ 'type' ][ $validatedFile[ 'type'] ][] = $validatedFile;
					$this->files[ 'numFiles' ][ 'total' ]++;
					if( isset( $this->files[ 'numFiles' ][ $validatedFile[ 'type'] ] ) )
					{
						$this->files[ 'numFiles' ][ $validatedFile[ 'type'] ]++;
					}
					else
					{
						$this->files[ 'numFiles' ][ $validatedFile[ 'type'] ] = 1;
					}
					$numAddedFiles++;
				}
			}
			
			return $numAddedFiles > 0;
		}
		
		
		/**
		* Validates an added file to be combined.
		* 
		* @param array $file File to be combined.
		* 
		* @return array|bool Array with the file with correct attributes or false if the file was not found (only local files).
		*/
		public function validateNewFile( $file = array() )
		{
			$varType = gettype( $file );
			$addFile = $this->defaultFileAttributes;
			$allowedAttributes = array_keys( $this->defaultFileAttributes );
			
			if( in_array( $varType, array( 'string', 'array' ) ) )
			{

				if( 'string' === $varType )
				{
					$src = $file;
					$file = array();
					$file[ 'src' ] = $src;
				}
				
				if( isset( $file[ 'src' ] ) )
				{
					if( empty( $file[ 'src' ] ) )
					{
						return false;
					}
					$addFile[ 'src' ] = $file[ 'src' ];
				}
				elseif( !isset( $file[ 'src' ] ) ) 
				{
					return false;
				}

				if( isset( $file[ 'local' ] ) && $file[ 'local' ] )
				{
					$addFile[ 'local' ] = $file[ 'local' ];
				}
				else
				{
					//guess if file is local or remote
					if( 'http' === strtolower( substr( $addFile[ 'src' ], 0, 4 ) ) )
					{
						$addFile[ 'local' ] = false;
					}
					else
					{
						$addFile[ 'local' ] = true;
					}
				}
				
				if( $addFile[ 'local' ] )
				{
					if( !file_exists( PATHS_WEBROOT . $addFile[ 'src' ] ) )
					{
						return false;
					}
					else
					{
						$addFile[ 'checksum' ] = $this->hashFile( PATHS_WEBROOT . $addFile[ 'src' ] );
					}
				}
				
				if( isset( $file[ 'type' ] ) )
				{
					$addFile[ 'type' ] = $file[ 'type' ];
				}
				else
				{
					// guess file type based on file ending
					$fileExts = explode( '.' , $addFile[ 'src' ] );
					$fileExt = array_pop( $fileExts );
					
					switch( $fileExt )
					{
						default:
						case 'js':
							$addFile[ 'type' ] = 'javascript';
						break;
						case 'css':
							$addFile[ 'type' ] = 'css';
						break;
					}
				}
				$addFile[ 'type' ] = strtolower( $addFile[ 'type' ] );
				
				if( isset( $file[ 'media' ] ) )
				{
					$addFile[ 'media' ] = $file[ 'media' ];
				}
				elseif( 'css' === $addFile[ 'type' ] )
				{
					$addFile[ 'media' ] = 'all';
				}
				
				$addFile[ 'media' ] = strtolower( $addFile[ 'media' ] );
				
				return $addFile;
			}
			return false;
		}

		/**
		* Prints out all added files. For debugging purposes.
		* 
		* @return string <Pre>formatted string of added files.
		*/		
		public function dumpFiles()
		{
			$this->preint_r( $this->files );
		}
		
		public function hashFile( $file )
		{
			$crc = hash_file( 'sha256', $file ); 
			
			return sprintf( "%s", $crc ); 
		}
		
		public function getFileExtension( $type )
		{
			$fileExt = 'js'; //default
			switch( $type )
			{
				case 'javascript':
					$fileExt = 'js';
				break;
				case 'css':
					$fileExt = 'css';
				break;
			}
			return $fileExt;
		}
		
		/**
		* Combines files of one type
		* 
		* @param string $type File type to be combined.
		* 
		* @return array|bool Array with the file with correct attributes or false if the file was not found (only local files).
		*/
		
		/*
			TO DO 
			getOption
			data structure
			updateOption
			
		*/
		public function generateCombinedFile( $type = '' )
		{
			if( empty( $type ) )
			{
				return false;
			}

			$combinedFiles = array();
			$version = $this->getOption( 'CombinedFilesLatestVersion' );
			$version = unserialize( $version );
			$versionDate = $this->getthedate();
			$filePath = PATHS_WEBROOT . '/' . $type;
			$filename = $this->defaultFileNamePrefix . $type . '.' . $this->getFileExtension( $type );
			
			if( 0 < count( $this->files[ 'numFiles' ][ 'total' ] ) )
			{
				file_put_contents( $filePath . '/' . $filename, '/* FILE ' . $filename . ', VERSION ' . $version[ $type ] . ' @ ' . $versionDate . ' */' . "\r\n" );
				
				foreach( $this->files[ 'type' ][ $type ] as $file )
				{
					if( file_exists( PATHS_WEBROOT . $file[ 'src' ] ) )
					{
						$fileContent = file_get_contents( PATHS_WEBROOT . $file[ 'src' ] );
						@file_put_contents( $filePath . '/' . $filename, "\r\n\r\n" . '/* FILE ' . $file[ 'src' ] . ', Checksum ' . $file[ 'checksum' ] . ' */' . "\r\n" . $fileContent, FILE_APPEND );
					}
				}
			}
			else
			{
				// clear the combined file
				$version[ 'type' ][ $type ] = '1.0';
				
				if( false !== file_put_contents( $filePath . '/' . $filename, '/* VERSION ' . $version . ' @ ' . $versionDate . ' */' ) )
				{
					$newVersion = $version;
					#$this->updateOption( 'CombinedFilesLatestVersion', $newVersion );
				}
			}
		}

		/*
			1. Get type (via click/AJAX later)
			2. Get folder
			3. Get files in folder
			4. Exclude the combined file if there is one
			5. Here's the files
			6. Run them through addFile()
			7. Use the validated files from 6 in generateCombinedFile()
			8. Update option
		*/
		
		public function generateCombined( $type = '' )
		{
			if( empty( $type ) )
			{
				return false;
			}
			
			$files = $this->getFiles( $type );
			call_user_func_array( array( $this, 'addFile'), $files );
			$generatedFile = $this->generateCombinedFile( $type );
		}
	}
?>